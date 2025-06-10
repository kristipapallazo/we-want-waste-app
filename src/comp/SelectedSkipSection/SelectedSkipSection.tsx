import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSkipPageCtx } from "../../hooks/useSkipCtx";

const SelectedSkipSection = () => {
  const { selectedSkip, setSelectedSkip } = useSkipPageCtx();
  const navigate = useNavigate();

  const onDeselect = () => {
    setSelectedSkip(null);
  };

  const onNext = () => {
    const route = "/";
    navigate(route);
  };

  return (
    <div>
      <footer>
        <Button onClick={onDeselect}>Deselect</Button>
        <Button onClick={onNext}>Next</Button>
      </footer>
    </div>
  );
};

export default SelectedSkipSection;
