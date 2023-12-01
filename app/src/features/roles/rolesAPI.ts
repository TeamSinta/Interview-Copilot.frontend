import { IMockMembers } from "./rolesInterface";

export const MockMembers = [
  {
    member_idx: 1,
    member_name: "Mohamed Shegow",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04D4BRG8CQ-c4ccf8605ed3-192",
    member_type: "member",
  },
  {
    member_idx: 2,
    member_name: "Suwon Baek",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04KS4AQG0N-5dc6b4356f80-512",
    member_type: "member",
  },
  {
    member_idx: 3,
    member_name: "Mattias Welamsson",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04L1685M5J-81974d1311f3-512",
    member_type: "member",
  },
  {
    member_idx: 4,
    member_name: "Mohamed Shegow",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04D4BRG8CQ-c4ccf8605ed3-192",
    member_type: "member",
  },
  {
    member_idx: 5,
    member_name: "Suwon Baek",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04KS4AQG0N-5dc6b4356f80-512",
    member_type: "member",
  },
  {
    member_idx: 6,
    member_name: "Mattias Welamsson",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04L1685M5J-81974d1311f3-512",
    member_type: "member",
  },
  {
    member_idx: 7,
    member_name: "Mohamed Shegow",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04D4BRG8CQ-c4ccf8605ed3-192",
    member_type: "member",
  },
  {
    member_idx: 8,
    member_name: "Suwon Baek",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04KS4AQG0N-5dc6b4356f80-512",
    member_type: "member",
  },
  {
    member_idx: 9,
    member_name: "Mattias Welamsson",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04L1685M5J-81974d1311f3-512",
    member_type: "member",
  },
  {
    member_idx: 10,
    member_name: "Mohamed Shegow",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04D4BRG8CQ-c4ccf8605ed3-192",
    member_type: "member",
  },
  {
    member_idx: 11,
    member_name: "Suwon Baek",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04KS4AQG0N-5dc6b4356f80-512",
    member_type: "member",
  },
  {
    member_idx: 12,
    member_name: "Mattias Welamsson",
    member_url:
      "https://ca.slack-edge.com/T04C82XCPRU-U04L1685M5J-81974d1311f3-512",
    member_type: "member",
  },
];

export const fetchMembers = () => {
  return new Promise<{ data: IMockMembers[] }>((resolve) =>
    setTimeout(() => resolve({ data: MockMembers }), 500)
  );
};
