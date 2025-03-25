/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *        email:
 *          type: string
 *        username:
 *          type: string
 *        created_at:
 *          type: integer
 *        updated_at:
 *          type: integer
 */
export default interface CreateUserResponse {
  id: number;
  username: string;
  email: string;
  created_at: number;
  updated_at: number;
}
