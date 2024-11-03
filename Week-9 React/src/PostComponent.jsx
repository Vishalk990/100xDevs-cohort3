import { logo } from "./assets";

export default function PostComponent({
  name,
  subtitle,
  time,
  imageUrl,
  description,
}) {
  return (
    <div
      style={{
        width: 400,
        backgroundColor: "white",
        borderRadius: 10,
        borderColor: "gray",
        borderWidth: 1,
        padding: 20,
        margin: 10,
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <img src={imageUrl} style={{ width: 40, height: 40, borderRadius: 20 }} />
        <div style={{ fontSize: 12, marginLeft: 10 }}>
          <div>{name}</div>
          <div>{subtitle}</div>
          {time && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div>10m ago</div>
              <div>⏲️</div>
            </div>
          )}
        </div>
      </div>
      <div style={{ fontSize: 14, marginTop: 10 }}>{description}</div>
    </div>
  );
}
