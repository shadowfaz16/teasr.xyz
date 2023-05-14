import { useQuery, gql } from '@apollo/client';
import { useState, useEffect } from 'react';

const PROFILE_SCORE_QUERY = gql`
  query ProfileScore($profileId: String!) {
    profileScore(profileId: $profileId) {
      id
      score
      createdAt
      updatedAt
    }
  }
`;

function ProfileScore({ profileId, refresh }: { profileId: string, refresh: number }) {
    const { loading, error, data, refetch } = useQuery(PROFILE_SCORE_QUERY, {
        variables: { profileId },
    });

    // Refetch the data whenever the refresh prop changes
    useEffect(() => {
        refetch();
    }, [refresh]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :</p>;

    return (
        <div>
            <p className='text-brightYellow text-lg font-semibold'>{Math.round(data.profileScore.score)}</p>
        </div>
    );
}

export default ProfileScore;
