import { Flex, Skeleton } from "antd";

const FiltersRowSkeleton = () => {
  return (
    <Flex style={{ width: "60%", gap: 10 }}>
      <Skeleton.Input active block={true} />
      <Skeleton.Input active block={true} />
      <Skeleton.Input active block={true} />
      <Skeleton.Button active size="default" shape="default" />
      <Skeleton.Button active size="default" shape="default" />
    </Flex>
  );
};

export default FiltersRowSkeleton;
