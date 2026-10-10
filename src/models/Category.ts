export class Category {
  private id?: string | undefined;
  private name: string;
  private description: string | undefined;
  private icon: string | undefined;
  private display_order: number;
  private active: boolean;

  constructor(
    name: string,
    display_order: number,
    description?: string,
    icon?: string,
  ) {
    this.id = undefined;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.display_order = display_order;
    this.active = true;
  }

  static restore(
    id: string,
    name: string,
    display_order: number,
    active: boolean,
    description: string,
    icon:string,
  ): Category {
    const category = new Category(name, display_order, description, icon);

    category.id = id;
    category.active = active;

    return category;
  }

  //getters
  getId(): string | undefined {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getDescription(): string | undefined {
    return this.description;
  }
  getIcon(): string | undefined {
    return this.icon;
  }
  getDisplayOrder(): number {
    return this.display_order;
  }
  isActive(): boolean {
    return this.active;
  }

  //setters
  rename(nome: string): void {
    this.name = nome;
  }
  changeDescription(descricao: string): void {
    this.description = descricao;
  }
  changeIcon(icone: string): void {
    this.icon = icone;
  }
  changeDisplayOrder(ordem: number): void {
    this.display_order = ordem;
  }

  //others

  activate(): void {
    this.active = true;
  }
  deactivate(): void {
    this.active = false;
  }
}
