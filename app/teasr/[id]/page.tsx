'use client'
import { PublicationId, usePublication } from '@lens-protocol/react-web';

const Publication = () => {
  const { data: publication, loading } = usePublication({
    publicationId: '0x01a694-0x0d' as PublicationId,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("publication", publication)

  return (
    <div></div>
  );

}

export default Publication;