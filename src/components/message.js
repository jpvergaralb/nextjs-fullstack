import Image from "next/image"

function Message({children, avatar, username, description, timestamp, id}) {
  return (
    <div className="p-3 border-b-2 rounded-lg mb-10 border bg-gradient-to-r from-cool-dark to-cool-dark-3  border-slate-900 shadow-3xl bg-cool-dark-2 text-slate-200  bg-opacity-50 shadow-md backdrop-blur-md">

      <div className="flex flex-center justify-star">
        <Image src={avatar} height={42} width={42} className="rounded-full my-1" alt="You shouldn't see this"></Image>
        <h2 className="flex items-center mx-2 text-transparent bg-clip-text bg-gradient-to-r from-black to-slate-200 font-medium dark:from-violet-200 dark:to-indigo-200"> {username} </h2>
      </div>
      <div className="flex flex-center">
          <h3 className="text-ellipsis overflow-clip font-normal py-3 mb-5 mt-5"> {description} </h3>
      </div>
      <div> 
        <p className="text-xs my-1"> {timestamp ? new Date(timestamp?.toDate()).toLocaleString() : ''} </p>
      </div>
      {children}
    </div>
  )
}

export default Message