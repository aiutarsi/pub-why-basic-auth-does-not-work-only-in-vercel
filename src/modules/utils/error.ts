export class WithoutProviderError extends Error {
  constructor() {
    super();
    this.name = "WithoutProviderError";
    this.message = "Do not forget to wrap your component in provider";
  }
}

export class WithoutEnvError extends Error {
  constructor(variableName: string) {
    super();
    this.name = "EnvImportError";
    this.message = `Cannot import an environmental variable: ${variableName}`;
  }
}
