import { type FileRejection, useDropzone } from 'react-dropzone'
import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react'
import { Container, Typography, Backdrop, CircularProgress } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSnackbar } from 'notistack'

const thumbsContainer: CSSProperties = {
	display: 'flex',
	flexDirection: 'row',
	flexWrap: 'wrap',
	marginTop: 16,
}

const thumb: CSSProperties = {
	display: 'flex',
	borderRadius: 2,
	border: '1px solid #eaeaea',
	marginBottom: '8px',
	marginRight: '8px',
	marginLeft: '8px',
	width: '150px',
	height: '150px',
	padding: '4px',
	boxSizing: 'border-box',
	objectFit: 'cover',
	position: 'relative',
}

const thumbInner: CSSProperties = {
	display: 'flex',
	minWidth: 0,
	overflow: 'hidden',
	flex: 1,
	alignItems: 'center',
	justifyContent: 'center',
}

const img: CSSProperties = {
	display: 'block',
	width: 'auto',
	height: '100%',
	objectFit: 'cover',
	objectPosition: 'center',
}
type FileWithPreview = File & { preview: string; id: string }

const TodoDropZone = () => {
	const [files, setFiles] = useState<FileWithPreview[]>([])
	const { enqueueSnackbar } = useSnackbar()
	const [isLoading, setLoading] = useState(false)
	const filesRef = useRef<FileWithPreview[]>([])

	const imitation = () => {
		setTimeout(() => {
			setLoading(false)
			enqueueSnackbar(`Файлы загружены`, { variant: 'success' })
		}, 800)
		setLoading(true)
	}

	const onDrop = useCallback(
		(acceptedFiles: File[], fileRejections: FileRejection[]) => {
			console.log(fileRejections)
			const mappedFiles = acceptedFiles.map((file) =>
				Object.assign(file, {
					preview: URL.createObjectURL(file),
					id: crypto.randomUUID(),
				})
			)
			if (fileRejections.length !== 0) {
				for (const error of fileRejections) {
					error.errors.forEach((error) => {
						enqueueSnackbar(`Файл не загружен ` + error.message, { variant: 'error' })
					})
				}
			} else {
				setFiles((prev) => [...prev, ...mappedFiles])
				imitation()
			}
		},
		[imitation, enqueueSnackbar]
	)

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: {
			'image/png': ['.png'],
			'image/jpeg': ['.jpeg', '.jpg'],
		},
		maxFiles: 1,
		maxSize: 5_242_800,
		onDrop,
	})

	const handleDeleteImg = (event: React.MouseEvent, id: string) => {
		event.stopPropagation()
		event.preventDefault()
		const fileToDelete = files.find((file) => file.id === id)
		if (fileToDelete) URL.revokeObjectURL(fileToDelete.preview)
		setFiles((prev) => prev.filter((file) => file.id !== id))
		enqueueSnackbar(`Файл удален `, { variant: 'warning' })
	}

	const previewer = files.map((file) => (
		<div style={{ position: 'relative' }}>
			<Backdrop
				sx={{ color: '#fff', position: 'absolute', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={isLoading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Container
				sx={thumb}
				key={file.id}
				onClick={(event) => {
					event.stopPropagation()
					event.preventDefault()
				}}
			>
				<div style={thumbInner}>
					<img src={file.preview} style={img} />
				</div>
				<DeleteIcon
					sx={{ position: 'absolute', top: '1', right: '3px', cursor: 'pointer', color: 'red' }}
					onClick={(event) => handleDeleteImg(event, file.id)}
				></DeleteIcon>
			</Container>
		</div>
	))

	useEffect(() => {
		filesRef.current = files
	}, [files])

	useEffect(() => {
		return () => filesRef.current.forEach((file) => URL.revokeObjectURL(file.preview))
	}, [])

	return isDragActive ? (
		<Container
			sx={{ border: '2px dashed #eaeaea', backgroundColor: 'green', m: '20px 0' }}
			{...getRootProps({ className: 'dropzone' })}
		>
			<input {...getInputProps()} />
			<Typography sx={{ m: '20px 0' }}>Отдай файл</Typography>
			<aside style={thumbsContainer}>{previewer}</aside>
		</Container>
	) : (
		<Container
			sx={{ border: '2px dashed #eaeaea', backgroundColor: 'grey', m: '20px 0' }}
			{...getRootProps({ className: 'dropzone' })}
		>
			<input {...getInputProps()} />
			<Typography sx={{ m: '20px 0' }}>Drag 'n' drop some files here, or click to select files</Typography>
			<aside style={thumbsContainer}>{previewer}</aside>
		</Container>
	)
}

export default TodoDropZone
