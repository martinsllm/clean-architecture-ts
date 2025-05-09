import { User } from "../entity/user"

export interface UserInterface {
    save(user: User): Promise<void>
    findByEmail(email: string): Promise<User>
}
