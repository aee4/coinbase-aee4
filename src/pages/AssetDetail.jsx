import { useParams } from 'react-router-dom';

function AssetDetail() {
    const { id } = useParams();
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Asset Details: {id}</h1>
            <p>This is the detail page for {id} placeholder.</p>
        </div>
    );
}

export default AssetDetail;
