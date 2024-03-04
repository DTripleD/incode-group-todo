import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../components/Loader/Loader";
import CreateNewBoard from "../../components/Forms/CreateNewBoard";
import DashboardItem from "../../components/DashboardItem/DashboardItem";
import { BoardList, CreateButton, CreateWrapper } from "./DashboardPage.styled";

import { AppDispatch } from "../../redux/store";
import { getData } from "../../redux/dashboard/dashboardOperations";
import { dataSelector, isLoadingBoardSelector } from "../../redux/selectors";

const Dashboard = () => {
  const [creating, setCreating] = useState(false);

  const data = useSelector(dataSelector);

  const isLoading = useSelector(isLoadingBoardSelector);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <BoardList>
        {data.map((board) => (
          <DashboardItem key={board._id} board={board} />
        ))}
      </BoardList>
      <CreateWrapper>
        {creating ? (
          <CreateNewBoard setCreating={setCreating} />
        ) : (
          <CreateButton onClick={() => setCreating(true)}>
            Create new board
          </CreateButton>
        )}
      </CreateWrapper>
    </div>
  );
};

export default Dashboard;
