import { Link } from "react-router-dom";

const Dashboard = ({ data }: { data: any }) => {
  console.log(data);
  return (
    <div>
      {data.map((board) => (
        <Link key={board._id} to={board._id}>
          <p>{board.title}</p>
        </Link>
      ))}
    </div>
  );
};

export default Dashboard;
