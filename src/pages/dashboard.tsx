import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from "./api/auth/[...nextauth]"

const Dashboard = () => {
    const { data: session } = useSession();

    if (typeof window === "undefined") return null
return(
<div>
    {session && <div className='flex gap-x-3 px-96 text-3xl'>
            Howdy <p>{session.user?.name},</p>
        </div>}
    {!session && <div>Access Denied. <br /> Please sign in first.</div>}
</div>

)
}

export async function getServerSideProps(context:any) {
    return {
      props: {
        session: await getServerSession(
          context.req,
          context.res,
          authOptions
        ),
      },
    }
  }

export default Dashboard;