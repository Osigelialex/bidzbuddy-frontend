

const Card = ({ color, title, value, Icon }) => {
  return (
    <div className="shadow-md">
      <div className="grid place-items-center">
        <div>
          <Icon />
          <h2 className="text-lg">{title}</h2>
        </div>
        <p className="text-4xl font-bold">{value}</p>
      </div>
    </div>
  )
}

export default Card;