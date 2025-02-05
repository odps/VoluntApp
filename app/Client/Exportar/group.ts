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
    
    

    
    /*id: number;
    name: string;
    description?: string; // (nullable)
    reputationRequired: number; // Minimo de reputacion para apuntarse
    createdBy: User['id']; // This references User['id']
    createdAt: Date;
    updatedAt: Date;*/

