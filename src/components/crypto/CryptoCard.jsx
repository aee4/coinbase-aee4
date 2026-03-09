import Card from '../common/Card';

const CryptoCard = ({ name, symbol, price, change, className = "" }) => {
    const isPositive = change >= 0;

    return (
        <Card className={`flex flex-col ${className}`}>
            <div className="flex justify-between items-start mb-2">
                <div>
                    <h3 className="font-bold text-lg">{name}</h3>
                    <span className="text-gray-500 text-sm uppercase">{symbol}</span>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-2xl font-semibold">${price.toLocaleString()}</p>
                <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? '+' : ''}{change}%
                </p>
            </div>
        </Card>
    );
};

export default CryptoCard;
