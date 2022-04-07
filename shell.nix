{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  name = "Nymeria-JS";

  nativeBuildInputs = with pkgs; [
    nodejs
  ];

  shellHook = ''
  '';
}
