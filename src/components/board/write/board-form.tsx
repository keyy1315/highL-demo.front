"use client";

import { ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Label } from "../../ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Textarea } from "../../ui/textarea";
import { BoardRequest } from "@/types/board";
import { useBoard } from "@/hooks/useBoard";
import { useCategory } from "@/hooks/useCategory";

export default function BoardForm() {
  const { categories } = useCategory();
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [images, setImages] = useState<Array<{ file: File; preview: string }>>(
    []
  );
  const [currentTag, setCurrentTag] = useState("");
  const [form, setForm] = useState<BoardRequest>({
    title: "",
    content: "",
    category: "",
    tags: [],
  });
  const router = useRouter();

  const { setBoardMutation } = useBoard();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (images.length > 0) return;

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    }
  };

  const handleImagesDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (videoFile) return;

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    if (files.length > 0) {
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages([...images, ...newImages]);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);

      images.forEach((image) => URL.revokeObjectURL(image.preview));
      setImages([]);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      if (videoFile) return;

      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const addTag = () => {
    if (
      currentTag.trim() &&
      !form.tags.includes(currentTag.trim()) &&
      form.tags.length < 5
    ) {
      setForm((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setForm((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("formData : ", form);
    console.log("videoFile : ", videoFile);
    setBoardMutation(
      { boardRequest: form, file: videoFile },
      {
        onSuccess: () => {
          // router.push("/");
        },
      }
    );
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  return (
    <div className="col-span-2 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Video Upload</CardTitle>
          <CardDescription>
            Upload your video file (MP4, MOV, or WebM format)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 
                    ${
                      images.length > 0
                        ? "opacity-50"
                        : "hover:border-primary/50 transition-colors"
                    }
                    ${!videoFile ? "cursor-pointer" : ""}`}
            onDragOver={handleDragOver}
            onDrop={handleVideoDrop}
            onClick={() => {
              if (!videoFile && !images.length) {
                document.getElementById("video-upload")?.click();
              }
            }}
          >
            {!videoFile ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="rounded-full bg-primary/10 p-4">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-yellow-500 mb-2">
                    You can upload either images or video, not both
                  </p>
                  <p className="text-sm font-medium">
                    Drag and drop your video or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maximum file size: 2GB
                  </p>
                </div>
                <Input
                  type="file"
                  id="video-upload"
                  className="hidden"
                  accept="video/mp4,video/mov,video/webm"
                  onChange={handleVideoChange}
                  disabled={images.length > 0}
                />
              </div>
            ) : (
              <div className="flex w-full flex-col items-center space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-muted p-4 w-full">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Upload className="h-4 w-4 text-primary" />
                    </div>
                    <div className="text-sm">
                      <p className="font-medium">{videoFile.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setVideoFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-green-600">Video ready for upload</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Video Details</CardTitle>
            <CardDescription>
              Provide information about your video
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter a descriptive title"
                required
                value={form.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Description</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Tell viewers about your video"
                className="min-h-[120px]"
                value={form.content}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Images</Label>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div
                  className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 
                        ${
                          videoFile
                            ? "opacity-50"
                            : "hover:border-primary/50 transition-colors"
                        }
                        ${images.length === 0 ? "cursor-pointer" : ""}`}
                  onDragOver={handleDragOver}
                  onDrop={handleImagesDrop}
                  onClick={() => {
                    if (!videoFile && images.length === 0) {
                      document.getElementById("image-upload")?.click();
                    }
                  }}
                >
                  <div className="w-full">
                    {images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={image.preview}
                              alt={`Preview ${index + 1}`}
                              width={96}
                              height={96}
                              className="w-full h-24 object-cover rounded-md"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="absolute right-1 top-1 h-6 w-6 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(index);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {images.length === 0 ? (
                      <div className="flex flex-col items-center space-y-2">
                        <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        <p className="text-xs text-center text-muted-foreground">
                          Drag and drop your images or click to browse
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-center text-muted-foreground mb-2">
                        Drag and drop or click to add more images
                      </p>
                    )}

                    <Input
                      type="file"
                      id="image-upload"
                      className="hidden"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImagesChange}
                      disabled={!!videoFile}
                      multiple
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Image tips:</p>
                  <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
                    <li className="text-yellow-500">
                      You can upload either images or video, not both
                    </li>
                    <li>Upload multiple images</li>
                    <li>Use clear, high-quality images</li>
                    <li>Maximum 10 images allowed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (write after press enter)</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {form.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {tag}
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 rounded-full"
                      onClick={() => removeTag(tag)}
                    >
                      <X className="h-2 w-2" />
                    </Button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  id="tags"
                  placeholder="Add a tag"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  disabled={form.tags.length >= 5}
                />
                <Button
                  type="button"
                  onClick={addTag}
                  disabled={!currentTag.trim() || form.tags.length >= 5}
                >
                  Add
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push("/")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!videoFile}>
              {"Publish Video"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
