import React from 'react'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { getUsersPage } from './api/axios'
import User from "./User"
import PageButton from "./PageButton"


function Example() {
    const [page, setPage] = useState(1)

    const {
      isLoading,
      isError,
      error,
      data:users, 
      isFetching,
      isPreviousData,
    } = useQuery(["/users", page], () => getUsersPage(page),{
      keepPreviousData: true,
    })

    if (isLoading) return <p>Loading Users....</p>

    if(isError) return <p>Error: {error.message}</p>

    const content = users.data.map(user => <User key={users.id} user={user}  />)

    const nextPage = () => setPage(prev => prev + 1)
    
    const prevPage = () => setPage(prev => prev - 1)

    const pagesArray =  Array(users.total_pages).fill().map((_,index) => index + 1)
    console.log(pagesArray)

    const nav = (
        <nav>
            <button onClick={prevPage} disabled={isPreviousData  || page === 1 } >&lt;&lt;</button>
            {
                pagesArray.map(pg => <PageButton key={pg.id} pg={pg} setPage={setPage} isPreviousData={isPreviousData} />)
            }
               <button onClick={nextPage} disabled={isPreviousData || page == users.total_pages } >&gt;&gt;</button>

        </nav>
    )



  return (
    <>
    {nav}
    {isFetching && <p>Loading...</p>}
    {
        !isFetching && !isLoading && content
    }
   
    </>



  )

}


export default Example