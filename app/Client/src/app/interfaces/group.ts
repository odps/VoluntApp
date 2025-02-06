export interface GroupResponse {
  groups: {
    current_page: number;
    data: Group[];
  }
}

export interface Group {
  id: number;
  name: string;
  description: string;
  reputation_required: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  creator: {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
  };
}

  export interface GroupInfoResponse {
    group: { // <-- Esta es la clave!
      id: number;
      name: string;
      description: string;
      reputation_required: number;
      created_by: number;
      created_at: string;
      updated_at: string;
      creator: {
        id: number;
        name: string;
        email: string;
        email_verified_at: string | null;
        created_at: string;
        updated_at: string;
      };
      members: GroupMember[]; // Array de miembros
    };
  }

  //export type GroupMembers = GroupMember[];
  

  export interface GroupMember {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    pivot: {
      group_id: number;
      user_id: number;
      role: "admin" | "member";
      created_at: string;
      updated_at: string;
    };
  }
  
  


  

  /*export interface GroupMembers {
    members: [
      {
          id: number,
          name: string,
          email: string,
          email_verified_at: null,
          created_at: Date,
          updated_at: Date,
          pivot: {
              group_id: number,
              user_id: number,
              role: "admin" | "member",
              created_at: Date,
              updated_at: Date
          }
      }
  ]
  }*/
    
    

    
    /*id: number;
    name: string;
    description?: string; // (nullable)
    reputationRequired: number; // Minimo de reputacion para apuntarse
    createdBy: User['id']; // This references User['id']
    createdAt: Date;
    updatedAt: Date;*/

