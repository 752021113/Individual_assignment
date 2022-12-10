import React from 'react';
import { Container, ImageList, ImageListItem, ImageListItemBar, IconButton } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_IMAGES } from '../utils/queries';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import Upload from './Upload';
import { useMutation } from '@apollo/client';
import { LIKE } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Home = () => {
	const [likeImage] = useMutation(LIKE);
	const accountInfo = JSON.parse(sessionStorage.getItem('accountInfo'));
	const navigate = useNavigate();

	useEffect(() => {
		if (!accountInfo) {
			navigate('/signin');
		}
	}, []);

	const { data, loading, refetch } = useQuery(GET_IMAGES, {
		variables: { id: accountInfo?._id },
		fetchPolicy: 'network-only'
	});

	const handleLike = (imageId, status, index) => {
		likeImage({ variables: { userId: accountInfo?._id, imageId, status } }).then(() => {
			data.imageList[index].like = status;
		});
	};

	return (
		<>
			<Container maxWidth='lg'>
				{loading ? (
					'loading...'
				) : (
					<ImageList cols={3}>
						{data.imageList.map((item, index) => (
							<ImageListItem key={item._id}>
								<img
									src={`${item.url}?w=248&fit=crop&auto=format`}
									srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
									alt={item.title}
									loading='lazy'
								/>
								<ImageListItemBar
									sx={{
										background:
											'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
									}}
									title={item.title}
									position='top'
									actionIcon={
										<IconButton
											sx={{ color: item.like ? 'red' : 'white' }}
											aria-label={`star ${item.title}`}
											onClick={() => handleLike(item._id, !item.like, index)}
										>
											{item.like ? <StarIcon /> : <StarBorderIcon />}
										</IconButton>
									}
									actionPosition='left'
								/>
								<ImageListItemBar
									title={`@${item?.author}`}
									subtitle={item.description ?? <span>{item.description}</span>}
									position='below'
								/>
							</ImageListItem>
						))}
					</ImageList>
				)}
			</Container>
			<Upload refetch={refetch} />
		</>
	);
};

export default Home;
