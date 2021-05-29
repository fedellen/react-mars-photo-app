type SortHeadingProps = {
  heading: string;
};

export default function SortHeading({ heading }: SortHeadingProps) {
  return <h3 className="text-xs lg:small">{heading}</h3>;
}
