import { useUser } from "@auth0/nextjs-auth0";
import Layout from "../components/layout";
import clientPromise from "../lib/mongodb";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { SmileFilled } from "@ant-design/icons";
import Link from "next/link";

const content = {
  marginTop: "100px",
};

export default function Sample({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user, isLoading } = useUser();

  return (
    <Layout user={user} loading={isLoading}>
      {isLoading && <p>Loading login info...</p>}

      {!isLoading && !user && (
        <>
          <p>
            123 To test the login click in <i>Login</i>
          </p>
          <p>
            Test Once you have logged in you should be able to navigate between
            protected routes: client rendered, server rendered profile pages,
            and <i>Logout</i>
          </p>
        </>
      )}

      {user && isConnected && (
        <>
          <h4> 123 Rendered user info on the client</h4>
          {/* <img src={user.picture!} alt="user picture" /> */}
          <p>nickname: {user.nickname}</p>
          <p>name: {user.name}</p>
          <h4>You are connected to MongoDB</h4>
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const documents = db.collection("events").find({});
    documents.forEach((element) => {
      console.log("Id ", element._id);
      console.log("Element ", element);
    });

    return {
      props: { isConnected: true },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}
