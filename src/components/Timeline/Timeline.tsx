import './Timeline.scss';

type TTimelineData = {
  year: number,
  content: string
}

type TTimeline = {
  data: TTimelineData[] 
}

const Timeline = ({
  data
}: TTimeline) => {
  return (
    <div className="timeline flex flex-col gap-0">
      {data.map((item, index) => (
        <div className="text-white flex gap-6 timeline-item" key={index}>
          <div className="flex flex-col items-center"> 
            <div className="timeline-item-mark rounded-full flex-shrink-0"></div>
            <div className="timeline-item-line w-1 h-full -mt-4"></div>
          </div>
          <div className="pb-8">
            <div className='gradient-gold font-bold w-fit pb-2 text-xl'>{item.year}</div>
            <div>{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Timeline;