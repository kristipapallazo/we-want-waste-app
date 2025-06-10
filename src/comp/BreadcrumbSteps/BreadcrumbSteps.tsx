import { Link, useLocation } from "react-router-dom";
import { Breadcrumb } from "antd";
import { moduleArr } from "../../router/routes";
import { ReactNode } from "react";

const BreadcrumbSteps = () => {
  const location = useLocation();
  const currentIndex = moduleArr.findIndex((m) => m.path === location.pathname);
  const crumbs = currentIndex >= 0 ? moduleArr.slice(0, currentIndex + 1) : [];

  const items: { title: ReactNode }[] = crumbs.map((m, idx) => ({
    title: <Link to={m.path}>{m.label}</Link>,
  }));

  return <Breadcrumb items={items} />;
};

export default BreadcrumbSteps;
