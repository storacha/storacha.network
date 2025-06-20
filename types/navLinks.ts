export interface Link { text: string, href: string }

export interface NavLink {
  text: string
  href?: string
  dropdown?: {
    text: string
    href: string
  }[]
}

export type NavLinks = NavLink[]

