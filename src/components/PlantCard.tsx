
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plant } from "@/types";
import { Calendar, Droplet, MapPin } from "lucide-react";

interface PlantCardProps {
  plant: Plant;
}

const PlantCard = ({ plant }: PlantCardProps) => {
  return (
    <Card className="plant-card overflow-hidden h-full flex flex-col">
      <div className="relative w-full h-48 overflow-hidden">
        {plant.imageUrl ? (
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary">No Image</span>
          </div>
        )}
      </div>
      <CardHeader className="pb-2 pt-3">
        <CardTitle className="text-lg">{plant.name}</CardTitle>
        <p className="text-sm text-muted-foreground italic">{plant.species}</p>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm">
              Planted: {new Date(plant.plantedDate).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm">{plant.location}</span>
          </div>

          {plant.waterFrequency && (
            <div className="flex items-center gap-2">
              <Droplet className="w-4 h-4 text-primary" />
              <span className="text-sm">
                Water every {plant.waterFrequency} days
              </span>
            </div>
          )}

          {plant.notes && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {plant.notes}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <button className="btn-secondary text-sm w-full">View Details</button>
      </CardFooter>
    </Card>
  );
};

export default PlantCard;
