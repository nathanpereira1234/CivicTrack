import React from 'react';
import { Link } from 'react-router-dom';
import IssueCard from './IssueCard';

// This component receives an array of 'issues' as a prop
const IssueList = ({ issues }) => {
  return (
    // This grid layout matches the one on your HomePage
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {issues.map(issue => (
        // Each card is a link to that issue's detail page
        <Link to={`/issue/${issue._id}`} key={issue._id} className="no-underline">
          <IssueCard issue={issue} />
        </Link>
      ))}
    </div>
  );
};

export default IssueList;
