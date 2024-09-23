import { gql } from '@apollo/client';

const ADD_MOVEMENT = gql`
   mutation AddMovement($companyId: Int, $input: MovementInput) {
      addMovement(companyId: $companyId, input: $input) {
         id
         title
      }
   }
`;

const GET_COMPANY_MOVEMENT = gql`
   query GetCompanyMovement($id: ID, $companyId: Int) {
      movement(id: $id, companyId: $companyId) {
         id
         company_id
         company_user_id
         movement_type_id
         title
         description
         datetime
         amount
         is_cancelled
         created_at
         updated_at

         lastMovementHistory {
            updated_at
            companyUser {
               user {
                  name
               }
            }
         }

         totalComments
         totalFiles
         totalUpdates

         comments {
            id
         }

         companyUser {
            user {
               name
            }
         }

         files {
            id
            file
            title
            created_at
            updated_at

            companyUser {
               user {
                  name
               }
            }
         }

         type {
            id
            name
         }
      }
   }
`;

const GET_COMPANY_MOVEMENTS = gql`
   query GetCompanyMovements($companyId: Int) {
      movements(companyId: $companyId) {
         id
         movement_type_id
         title
         datetime
         amount
         is_cancelled
         created_at

         totalComments
         totalFiles
      }
   }
`;

const UPDATE_MOVEMENT = gql`
   mutation UpdateMovement($companyId: Int, $input: MovementInput) {
      updateMovement(companyId: $companyId, input: $input) {
         id
      }
   }
`;

export { ADD_MOVEMENT, GET_COMPANY_MOVEMENT, GET_COMPANY_MOVEMENTS, UPDATE_MOVEMENT };
