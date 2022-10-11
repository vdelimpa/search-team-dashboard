import React from "react";
import { Table } from "react-bootstrap";
import { TableTeamHealth } from "../../types/teamHealth";

interface TeamHealthTableProps {
  dailyScores: [];
}
export const TeamHealthTable: React.FC<TeamHealthTableProps> = ({
  dailyScores,
}) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Daily Score</th>
          <th>Number of attendees</th>
        </tr>
      </thead>
      <tbody>
        {dailyScores?.map((item: TableTeamHealth) => (
          <tr key={item.id}>
            <td>{item.date}</td>
            <td>{item.dailyScore.toFixed(2)}</td>
            <td>{item.numberOfPeople}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
