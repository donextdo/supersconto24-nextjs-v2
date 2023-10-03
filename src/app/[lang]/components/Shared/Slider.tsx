import React, { useRef, useState } from 'react'
import Button from './Button'
import Card from './Card'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'



interface Props {
    children: React.ReactNode
    padding?: string,
    gap?: string,
    grid?: string
}

const Slider: React.FC<Props> = ({children, padding, gap, grid}) => {

    const rowRef = useRef<HTMLDivElement>(null)
    // const [isMoved, setIsMoved] = useState(false)

    const handleClick = (direction: string) => {
        // setIsMoved(true)
        if (rowRef.current) {
        const { scrollLeft, clientWidth } = rowRef.current

        const scrollTo =
            direction === 'left'
            ? scrollLeft - clientWidth / 2
            : scrollLeft + clientWidth / 2

        rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
        }
    }

  return (
    <Card padding={padding ? padding : 'px-10 py-4'} styleClass='rounded-md relative'>
        
        <div ref={rowRef}
        className={`w-full grid grid-flow-col overflow-x-hidden scrollbar-hide  ${gap ? gap : 'gap-4'} ${grid ? grid : 'grid-rows-1'}`}>
            { children} 
        
        </div>

        <Button 
        styleClass='absolute -left-4 top-0 bottom-0 h-9 w-9 
        grid place-items-center my-auto  
        bg-white shadow-lg z-10 rounded-full'
        onClick={() => handleClick('left')}>
            <FiChevronLeft className='w-8 h-8'/>
        </Button>

        <Button 
        styleClass='absolute -right-4 top-0 bottom-0 h-9 w-9 
        grid place-items-center my-auto  
        bg-white shadow-lg z-10 rounded-full'
        onClick={() => handleClick('right')}>
            <FiChevronRight className='w-8 h-8'/>
        </Button>

    </Card>
  )
}

export default Slider