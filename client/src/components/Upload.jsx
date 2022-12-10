import React, { useState } from 'react';
import {
	Dialog,
	Fab,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	Slide,
	TextField,
	Typography
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import { Stack } from '@mui/system';
import { useRef } from 'react';
import { UPLOAD } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const Upload = ({ refetch }) => {
	const [open, setOpen] = useState(false);
	const fileInput = useRef();
	const form = useRef();
	const [uploadFile] = useMutation(UPLOAD);
	const [fileName, setFileName] = useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSelect = () => {
		setFileName(fileInput.current.files[0].name);
	};

	const handleSubmit = () => {
		const file = fileInput.current.files[0];
		const validity = fileInput.current.validity;
		const data = new FormData(form.current);
		const { firstName, lastName } = JSON.parse(sessionStorage.getItem('accountInfo'));
		validity.valid &&
			uploadFile({
				variables: {
					file,
					title: data.get('title'),
					description: data.get('description'),
					author: `${firstName} ${lastName}`
				}
			}).then(() => {
				handleClose();
				refetch();
			});
	};

	return (
		<>
			<Fab
				color='primary'
				aria-label='upload'
				sx={{ position: 'fixed', right: 24, bottom: 24 }}
				onClick={handleClickOpen}
			>
				<UploadIcon />
			</Fab>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby='upload-dialog'
			>
				<DialogTitle>Upload Image</DialogTitle>
				<DialogContent>
					<form ref={form}>
						<TextField margin='normal' required fullWidth id='title' label='Title' name='title' />
						<TextField
							margin='normal'
							required
							fullWidth
							id='description'
							label='Description'
							name='description'
							multiline
							rows={3}
						/>
					</form>
					<Button component='label'>
						Choose file
						<input hidden accept='image/*' multiple type='file' ref={fileInput} onChange={handleSelect} />
					</Button>
					{fileName && <Typography>{fileName}</Typography>}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button variant='contained' onClick={handleSubmit}>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default Upload;
