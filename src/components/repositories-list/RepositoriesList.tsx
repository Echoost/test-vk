import RepositoriesStore from '@/stores/repositories-store';
import { Box } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef, useState, useCallback } from 'react';
import classes from './RepositoriesList.module.scss';
import InfiniteScroll from 'react-infinite-scroll-component';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Input } from '@/components/ui/Input/Input';
import gsap from 'gsap';

export const RepositoriesList = observer(() => {
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);
    const [currentEdit, setCurrentEdit] = useState<number>(null);
    const elementsRef = useRef([]);
    const [animatedIndices, setAnimatedIndices] = useState(new Set());

    const { getRepositoriesAction, deleteRepository, data, filteredData } =
        RepositoriesStore;

    useEffect(() => {
        const fetch = async () => {
            if (fetching) {
                await getRepositoriesAction(currentPage);

                setFetching(false);
            }
        };
        fetch();
    }, [fetching, currentPage, getRepositoriesAction]);

    useEffect(() => {
        if (filteredData && filteredData.length > 0) {
            const newIndices = filteredData
                .map((_, index) => index)
                .filter(index => !animatedIndices.has(index));

            if (newIndices.length > 0) {
                gsap.fromTo(
                    newIndices.map(index => elementsRef.current[index]),
                    { opacity: 0, y: 20 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.5,
                        stagger: 0.1,
                        ease: 'power2.out',
                    },
                );

                setAnimatedIndices(prev => {
                    const updatedIndices = new Set(prev);
                    newIndices.forEach(index => updatedIndices.add(index));
                    return updatedIndices;
                });
            }
        }
    }, [filteredData]);

    const fetchMore = useCallback(() => {
        setCurrentPage(prevPage => prevPage + 1);
        setFetching(true);
    }, []);

    const handleDeleteRepository = useCallback(
        (id: number) => {
            deleteRepository(id);
        },
        [deleteRepository],
    );

    const handleSetCurrentEdit = (id: number) => {
        setCurrentEdit(id);
    };

    return (
        <InfiniteScroll
            dataLength={data.length}
            next={fetchMore}
            hasMore={true}
            loader={<p style={{ textAlign: 'center' }}>Loading...</p>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
            scrollThreshold={'100px'}
        >
            {filteredData.map((element, index) => (
                <Box
                    className={classes.repo_item}
                    key={element.id}
                    ref={el => (elementsRef.current[index] = el)}
                >
                    {currentEdit === element.id ? (
                        <Input
                            name={element.name}
                            id={element.id}
                            setCurrentEdit={setCurrentEdit}
                        />
                    ) : (
                        <a
                            className={classes.repo_link}
                            href={element.owner.html_url}
                        >
                            <Box
                                display={'flex'}
                                gap={'20px'}
                                alignItems={'center'}
                            >
                                <img
                                    className={classes.repo_img}
                                    src={element.owner.avatar_url}
                                    alt={element.name}
                                />
                                <p>{element.name}</p>
                            </Box>
                        </a>
                    )}

                    <Box display={'flex'} gap={'10px'}>
                        <EditIcon
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleSetCurrentEdit(element.id)}
                        />
                        <DeleteIcon
                            sx={{ cursor: 'pointer' }}
                            onClick={() => handleDeleteRepository(element.id)}
                        />
                    </Box>
                </Box>
            ))}
        </InfiniteScroll>
    );
});
