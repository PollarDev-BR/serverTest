{ pkgs }: {
	deps = [
		pkgs.lua5_4_compat
  pkgs.sudo
  pkgs.nodejs-16_x
        pkgs.nodePackages.typescript-language-server
        pkgs.yarn
        pkgs.replitPackages.jest
	];
}