import React from 'react';

const IssueCard = ({ issue }) => {
  // Determine status color based on issue status (you can expand this)
  let statusColorClass = 'bg-gray-200 text-gray-800';
  if (issue.status === 'In Progress') {
    statusColorClass = 'bg-yellow-200 text-yellow-800';
  } else if (issue.status === 'Reported') {
    statusColorClass = 'bg-red-200 text-red-800';
  } else if (issue.status === 'Resolved') {
    statusColorClass = 'bg-green-200 text-green-800';
  }

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden">
      <img src={issue.imageUrl} alt={issue.description} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">{issue.category}</h3>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColorClass}`}>
                {issue.status || 'Reported'}
            </span>
        </div>
        <p className="text-sm text-gray-600 mb-3 truncate">{issue.description}</p>
        <div className="text-xs text-gray-500">
            <p>Location: {issue.location.coordinates.join(', ')}</p>
            <p>Reported: {new Date(issue.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default IssueCard;
