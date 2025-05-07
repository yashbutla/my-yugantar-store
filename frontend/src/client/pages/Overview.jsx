import React from 'react'

function Overview() {
    return (
        <>
            <section className='px-[30px] py-[25px]'>
                <div className='flex gap-[30px]'>
                    <div className='bg-[#1C2536] w-[25%]'>
                        <h4 className='text-[#fff]'>Total Sale</h4>
                    </div>
                    <div className='bg-[#1C2536] w-[25%]'>
                        <h4 className='text-[#fff]'>Total Order</h4>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Overview
