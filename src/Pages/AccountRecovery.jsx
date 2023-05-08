import { useParams } from "react-router-dom";

function AccountRecovery() {
  const { id, token } = useParams();
  console.log(id, token);
  return <div>AccountRecovery</div>;
}

export default AccountRecovery;
