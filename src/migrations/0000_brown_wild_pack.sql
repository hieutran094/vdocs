CREATE TABLE `category` (
	`id` text PRIMARY KEY NOT NULL,
	`parent_id` text,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`meta_title` text,
	`content` text
);
--> statement-breakpoint
CREATE TABLE `post_category` (
	`post_id` text NOT NULL,
	`category_id` text NOT NULL,
	PRIMARY KEY(`category_id`, `post_id`),
	FOREIGN KEY (`post_id`) REFERENCES `post`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `post` (
	`id` text PRIMARY KEY NOT NULL,
	`author_id` text,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`meta_title` text,
	`summary` text,
	`content` text,
	`eye_catch_image_url` text,
	`published` integer,
	`delete_flag` integer DEFAULT 0,
	`created_at` integer DEFAULT current_timestamp,
	`updated_at` integer DEFAULT current_timestamp,
	FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`email` text NOT NULL,
	`password` text,
	`role` integer DEFAULT 1,
	`image_url` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `category_slug_idx` ON `category` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `post_slug_idx` ON `post` (`slug`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_idx` ON `user` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_idx` ON `user` (`username`);