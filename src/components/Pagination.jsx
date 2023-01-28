import React, { useState } from 'react';
import ReactPaginate from "react-paginate";
import { motion } from "framer-motion";
import Card from './Card';

const RenderCards = ({ data, title, pagesVisited, postsPerPage }) => {
    if(data?.length > 0) return data.slice(pagesVisited, pagesVisited + postsPerPage).map((post) => <Card key={post._id} {...post} />);

    return (
        <h2 className='mt-5 font-bold text-[#6469ff] text-xl uppercase'>{title}</h2>
    )
};

const Pagination = ({ posts, title, itemsPerPage }) => {
    const [pageNumber, setPageNumber] = useState(0);

    const postsPerPage = itemsPerPage;
    const pagesVisited = pageNumber * postsPerPage;

    const pageCount = posts ? Math.ceil(posts.length / postsPerPage) : null;

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const container = {
        hidden: { opacity: 1, scale: 0 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    return (
        <>
            <motion.div
                className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3 container'
                variants={container}
                initial="hidden"
                animate="visible"
            >
                <RenderCards
                    data={posts}
                    title={title}
                    pagesVisited={pagesVisited}
                    postsPerPage={postsPerPage}
                />
            </motion.div>
            {
                posts?.length > 0
                    ?
                        <ReactPaginate 
                            previousLabel={"Previous"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"isolate inline-flex -space-x-px rounded-md shadow-sm w-full mt-5 justify-center"}
                            pageLinkClassName={"relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium bg-[#6469ff] text-white focus:z-20"}
                            previousLinkClassName={"relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium bg-[#6469ff] text-white focus:z-20"}
                            nextLinkClassName={"relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium bg-[#6469ff] text-white focus:z-20"}
                            disabledClassName={"pagination-disabled"}
                            activeClassName={"pagination-active"}
                        />
                    : null
            }
            
        </>
    );
};

export default Pagination;