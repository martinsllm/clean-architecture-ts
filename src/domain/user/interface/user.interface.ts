import { User } from "../entity/user"

export interface UserInterface {
    save(user: User): Promise<void>
    findById(id: string): Promise<User>
}
