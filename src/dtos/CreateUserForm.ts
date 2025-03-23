/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserForm:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - password
 *        - passwordConfirmation
 *      properties:
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *        username:
 *          type: string
 *          default: Jane Doe
 *        password:
 *          type: string
 *          default: stringPassword123
 *        passwordConfirmation:
 *          type: string
 *          default: stringPassword123
 */
export default interface CreateUserForm {
  id: number;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
