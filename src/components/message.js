import Image from "next/image"

function Message({children, avatar, username, description, timestamp, id}) {
  return (
    <div className="bg-white p-8 border-b-2 rounded-lg">

      <div className="flex flex-center justify-start">
        <Image src={avatar} height={42} width={42} className="rounded-full " alt="You shouldn't see this"></Image>
        <h2 className="flex items-center mx-2 text-transparent bg-clip-text bg-gradient-to-r from-black to-slate-600 font-medium dark:from-violet-900 dark:to-blue-400"> {username} </h2>
      </div>
      <div className="flex flex-start">
          <h3 className="text-ellipsis overflow-clip font-normal py-3"> {description} </h3>
      </div>
      <div> 
        <p className="text-sm py-1"> {timestamp ? new Date(timestamp?.toDate()).toLocaleString() : ''} </p>
      </div>
      {children}
    </div>
  )
}

export default Message