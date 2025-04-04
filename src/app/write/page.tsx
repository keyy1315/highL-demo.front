"use client";

import Header from "@/components/header/header";
import { topics } from "@/types/topics";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, X, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

export default function Write() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [images, setImages] = useState<Array<{file: File; preview: string}>>([]);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 5) {
        setTags([...tags, currentTag.trim()])
        setCurrentTag("")
      }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
      // 이미지들 초기화
      images.forEach(image => URL.revokeObjectURL(image.preview));
      setImages([]);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      // 비디오가 있으면 이미지 업로드 불가
      if (videoFile) return;

      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview); // 메모리 정리
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleVideoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (images.length > 0) return; // 이미지가 있으면 비디오 업로드 불가

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleImagesDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (videoFile) return; // 비디오가 있으면 이미지 업로드 불가
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setImages([...images, ...newImages]);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

  };
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto max-w-7xl py-8">
        <div className="mb-8 ml-2">
          <h1 className="text-3xl font-bold">Write New Post</h1>
          <p className="text-muted-foreground">Share your Highlights In Game</p>
        </div>
        
        <div className="grid grid-cols-3 gap-6">
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
                    ${images.length > 0 ? 'opacity-50' : 'hover:border-primary/50 transition-colors'}
                    ${!videoFile ? 'cursor-pointer' : ''}`}
                  onDragOver={handleDragOver}
                  onDrop={handleVideoDrop}
                  onClick={() => {
                    if (!videoFile && !images.length) {
                      document.getElementById('video-upload')?.click();
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
                      <p className="text-sm text-green-600">
                        Video ready for upload
                      </p>
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
                      placeholder="Enter a descriptive title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Tell viewers about your video"
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Images</Label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 
                        ${videoFile ? 'opacity-50' : 'hover:border-primary/50 transition-colors'}
                        ${images.length === 0 ? 'cursor-pointer' : ''}`}
                        onDragOver={handleDragOver}
                        onDrop={handleImagesDrop}
                        onClick={() => {
                          if (!videoFile && images.length === 0) {
                            document.getElementById('image-upload')?.click();
                          }
                        }}
                      >
                        <div className="w-full">
                          {images.length > 0 && (
                            <div className="grid grid-cols-2 gap-2 mb-4">
                              {images.map((image, index) => (
                                <div key={index} className="relative group">
                                  <img
                                    src={image.preview}
                                    alt={`Preview ${index + 1}`}
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
                          <li className="text-yellow-500">You can upload either images or video, not both</li>
                          <li>Upload multiple images</li>
                          <li>Use clear, high-quality images</li>
                          <li>Maximum 10 images allowed</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (up to 5)</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
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
                        disabled={tags.length >= 5}
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        disabled={!currentTag.trim() || tags.length >= 5}
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem key={topic.id} value={topic.id}>
                            {topic.name}
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
                  <Button type="submit" disabled={isSubmitting || !videoFile}>
                    {isSubmitting ? "Publishing..." : "Publish Video"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </div>

          {/* 오른쪽 섹션 (1/3) */}
          <div className="col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Publishing Options</CardTitle>
                <CardDescription>
                  Control how your video is published
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="visibility">Visibility</Label>
                    <p className="text-xs text-muted-foreground">
                      Who can see your video
                    </p>
                  </div>
                  <Select defaultValue="public">
                    <SelectTrigger id="visibility" className="w-[140px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="unlisted">Unlisted</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="comments">Comments</Label>
                    <p className="text-xs text-muted-foreground">
                      Allow viewers to comment
                    </p>
                  </div>
                  <Switch id="comments" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notify">Notify Subscribers</Label>
                    <p className="text-xs text-muted-foreground">
                      Send notification to subscribers
                    </p>
                  </div>
                  <Switch id="notify" defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-bold">Content Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Before you publish, please ensure your content follows our
                  community guidelines:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-green-600"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>No copyright infringement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-green-600"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>No harmful or dangerous content</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-green-600"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>Respect privacy and consent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-500/20 p-1 mt-0.5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3 w-3 text-green-600"
                      >
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </div>
                    <span>No harassment or cyberbullying</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
