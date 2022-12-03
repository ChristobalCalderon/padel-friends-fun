import { useUser } from "@auth0/nextjs-auth0";
import Layout from "../components/layout";
import clientPromise from "../lib/mongodb";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Carousel } from "flowbite-react";

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user, isLoading } = useUser();

  return (
    <Layout user={user} loading={isLoading}>
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>
      </div>
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
