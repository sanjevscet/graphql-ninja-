import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import Spinner from "../Components/Spinner";
import ClientInfo from "../Components/ClientInfo";
import DeleteProjectButton from "../Components/DeleteProjectButton";

export default function Project() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    console.error(error);
    return <p>Something went wrong</p>;
  }

  return (
    <>
      {!loading && !error && (
        <div className="mx-auto w-75 card p-5">
          <Link to="/" className="btn btn-light btn-sn w-25 d-inline ms-auto">
            Back
          </Link>
          <h1>{data.project.name}</h1>
          <p>{data.project.description}</p>
          <h5 className="mt-3">Project Status</h5>
          <p className="lead">{data.project.status}</p>

          <ClientInfo client={data.project.client} />

          <DeleteProjectButton id={data.project.id} />
        </div>
      )}
    </>
  );
}
