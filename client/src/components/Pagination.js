import React, { useState } from "react";
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow, MDBContainer } from "mdbreact";

const Pagination = ({ totalPages,currPageNum,setCurrPageNumber }) => {
    
    console.log(currPageNum+" - "+totalPages)
    
    let display=[]
    if(currPageNum-3 <= totalPages && currPageNum -3 >=1) display.push(currPageNum-3)
    if(currPageNum-2 <= totalPages && currPageNum -2 >=1) display.push(currPageNum-2)
    if(currPageNum-1 <= totalPages && currPageNum -1 >=1) display.push(currPageNum-1)
    
    
    if(currPageNum <= totalPages) display.push(currPageNum)
    if(currPageNum+1 <= totalPages) display.push(currPageNum+1)
    if(currPageNum+2 <= totalPages) display.push(currPageNum+2)
    if(currPageNum+3 <= totalPages) display.push(currPageNum+3)

    
    
    
    return (
      
    <div class="container">
        
        <MDBRow>
        <MDBCol>
            <MDBPagination className="mb-5">
            <div className="container m-3 p-3 row align-items-center" style={{backgroundColor:"#FFFFFF",justifyContent:"center"}}>
            {display.map((num)=>{
                if(num == currPageNum){
                    return(
                        <MDBPageItem active onClick={(e) => setCurrPageNumber(num)}>
                            <MDBPageNav>{num}</MDBPageNav>
                        </MDBPageItem>
                    )
                }
                else{
                    return(
                        <MDBPageItem onClick={(e) => setCurrPageNumber(num)}>
                            <MDBPageNav>{num}</MDBPageNav>
                        </MDBPageItem>
                    )
                }
                
            })}
            </div>
            
            
            
            </MDBPagination>
        </MDBCol>
        </MDBRow>
       
    </div>
  )
}

export default Pagination;