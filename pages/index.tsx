import { useUser } from "@auth0/nextjs-auth0";
import Layout from "../components/layout";
import clientPromise from "../lib/mongodb";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { Button, Pagination } from "flowbite-react";
import { FaBeer, FaPlus } from "react-icons/fa";
import MatchEvent from "../components/matchEvent";
import Link from "next/link";

export default function Home({
  isConnected,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user, isLoading } = useUser();

  const onChange = (page: number) => console.log("weq");

  return (
    <Layout user={user} loading={isLoading}>
      <Pagination
        className="h-22"
        currentPage={15}
        totalPages={100}
        showIcons={true}
        onPageChange={onChange}
      />
      <MatchEvent></MatchEvent>
      <MatchEvent></MatchEvent>
      <div className="create dark:bg-black">
        <Link href={"createevent"}>
          <Button color="warning" pill={true} size={"xl"}>
            <FaPlus />
          </Button>
        </Link>
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
