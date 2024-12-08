import clsx from "clsx";

interface StatCardProps {
  type: "cancelled" | "pending" | "appointments";
  count: number;
  label: string;
  icon: string;
}

const StatCard = ({ type, count = 0, label, icon }: StatCardProps) => {
  return (
    <div
      className={clsx("stat-card", {
        "bg-appointments": type === "appointments",
        "bg-pending": type === "pending",
        "bg-cancelled": type === "cancelled",
      })}
    >
      <div className="flex items-center gap-4">
        <img
          src={icon}
          alt=""
          height={46}
          width={48}
          className="size-8 w-fit"
        />
        <h2 className="text-32-bold text-white">{count}</h2>
      </div>

      <p className="text-14-regular">{label}</p>
    </div>
  );
};

export default StatCard;
