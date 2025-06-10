import AllSkips from "../../comp/AllSkips/AllSkips";
import SearchBar from "../../comp/SearchBar/SearchBar";
import SkipPageCtxProvider from "../../ctx/SkipPageCtxProvider";
import { useSkipPageCtx } from "../../hooks/useSkipCtx";
import MainSpin from "../../UI/AntD/MainSpin/MainSpin";

const SkipContent = () => {
  const ctx = useSkipPageCtx();
  const { isLoading, error } = ctx;

  if (isLoading) return <MainSpin spinning={isLoading} />;
  if (error) return <p>Error loading skips</p>;

  return (
    <>
      <SearchBar />
      <AllSkips />
    </>
  );
};

const SkipPage = () => {
  return (
    <SkipPageCtxProvider>
      <SkipContent />
    </SkipPageCtxProvider>
  );
};

export default SkipPage;
