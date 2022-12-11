import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";

export default function URLPathBreadcrumb(props) {
  return (
    <Breadcrumb>
      <BreadcrumbItem>
        <span>🚩</span>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>

      {props.path.map((i) => (
        <BreadcrumbItem key={i}>
          <span>{i}</span>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
}
